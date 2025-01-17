/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findCandyGuardPda } from '../../hooked';

// Accounts.
export type CreateCandyGuardInstructionAccounts = {
  candyGuard?: PublicKey;
  base: Signer;
  authority?: PublicKey;
  payer?: Signer;
  systemProgram?: PublicKey;
};

// Arguments.
export type CreateCandyGuardInstructionData = {
  discriminator: Array<number>;
  data: Uint8Array;
};

export type CreateCandyGuardInstructionDataArgs = { data: Uint8Array };

export function getCreateCandyGuardInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateCandyGuardInstructionDataArgs,
  CreateCandyGuardInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateCandyGuardInstructionDataArgs,
    CreateCandyGuardInstructionData,
    CreateCandyGuardInstructionData
  >(
    s.struct<CreateCandyGuardInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['data', s.bytes()],
      ],
      { description: 'CreateCandyGuardInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      } as CreateCandyGuardInstructionData)
  ) as Serializer<
    CreateCandyGuardInstructionDataArgs,
    CreateCandyGuardInstructionData
  >;
}

// Instruction.
export function createCandyGuard(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: CreateCandyGuardInstructionAccounts &
    CreateCandyGuardInstructionDataArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Resolved accounts.
  const baseAccount = input.base;
  const candyGuardAccount =
    input.candyGuard ??
    findCandyGuardPda(context, { base: publicKey(baseAccount) });
  const authorityAccount = input.authority ?? context.identity.publicKey;
  const payerAccount = input.payer ?? context.payer;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    ),
    isWritable: false,
  };

  // Candy Guard.
  keys.push({
    pubkey: candyGuardAccount,
    isSigner: false,
    isWritable: isWritable(candyGuardAccount, true),
  });

  // Base.
  signers.push(baseAccount);
  keys.push({
    pubkey: baseAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(baseAccount, false),
  });

  // Authority.
  keys.push({
    pubkey: authorityAccount,
    isSigner: false,
    isWritable: isWritable(authorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Data.
  const data =
    getCreateCandyGuardInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
