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
  transactionBuilder,
} from '@metaplex-foundation/umi';

// Accounts.
export type UnwrapInstructionAccounts = {
  candyGuard: PublicKey;
  authority?: Signer;
  candyMachine: PublicKey;
  candyMachineAuthority?: Signer;
  candyMachineProgram?: PublicKey;
};

// Arguments.
export type UnwrapInstructionData = { discriminator: Array<number> };

export type UnwrapInstructionDataArgs = {};

export function getUnwrapInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UnwrapInstructionDataArgs, UnwrapInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UnwrapInstructionDataArgs,
    UnwrapInstructionData,
    UnwrapInstructionData
  >(
    s.struct<UnwrapInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'UnwrapInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: [126, 175, 198, 14, 212, 69, 50, 44],
      } as UnwrapInstructionData)
  ) as Serializer<UnwrapInstructionDataArgs, UnwrapInstructionData>;
}

// Instruction.
export function unwrap(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: UnwrapInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Resolved accounts.
  const candyGuardAccount = input.candyGuard;
  const authorityAccount = input.authority ?? context.identity;
  const candyMachineAccount = input.candyMachine;
  const candyMachineAuthorityAccount =
    input.candyMachineAuthority ?? context.identity;
  const candyMachineProgramAccount = input.candyMachineProgram ?? {
    ...context.programs.getPublicKey(
      'mplCandyMachine',
      'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
    ),
    isWritable: false,
  };

  // Candy Guard.
  keys.push({
    pubkey: candyGuardAccount,
    isSigner: false,
    isWritable: isWritable(candyGuardAccount, false),
  });

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Candy Machine.
  keys.push({
    pubkey: candyMachineAccount,
    isSigner: false,
    isWritable: isWritable(candyMachineAccount, true),
  });

  // Candy Machine Authority.
  signers.push(candyMachineAuthorityAccount);
  keys.push({
    pubkey: candyMachineAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(candyMachineAuthorityAccount, false),
  });

  // Candy Machine Program.
  keys.push({
    pubkey: candyMachineProgramAccount,
    isSigner: false,
    isWritable: isWritable(candyMachineProgramAccount, false),
  });

  // Data.
  const data = getUnwrapInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
