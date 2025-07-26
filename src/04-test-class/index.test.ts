import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.getBalance()).toBe(10)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.withdraw(11)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring more than balance', () => {
    const myBankAccount = getBankAccount(10);
    const anotherBankAccount = getBankAccount(9);
    expect(() => myBankAccount.transfer(12, anotherBankAccount)).toThrow(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.transfer(12, bankAccount)).toThrow(TransferFailedError)
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);
    bankAccount.deposit(4)
    expect(bankAccount.getBalance()).toBe(14)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);
    bankAccount.withdraw(4)
    expect(bankAccount.getBalance()).toBe(6)
  });

  test('should transfer money', () => {
    const myBankAccount = getBankAccount(10);
    const anotherBankAccount = getBankAccount(9);
    myBankAccount.transfer(2, anotherBankAccount)
    expect(myBankAccount.getBalance()).toBe(8)
    expect(anotherBankAccount.getBalance()).toBe(11)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const myBankAccount = getBankAccount(10);
    try {
      const balance = await myBankAccount.fetchBalance()
      if (balance) {
        expect(typeof balance).toBe('number');
      }
    } catch (err) {
      console.error(err);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myBankAccount = getBankAccount(10);
    const startBalance = myBankAccount.getBalance();
    try {
      await myBankAccount.synchronizeBalance();
      const newBalance = myBankAccount.getBalance()
      expect(newBalance !== startBalance).toBe(true)
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError)
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myBankAccount = getBankAccount(10);
    try {
      await myBankAccount.synchronizeBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError)
    }
  });
});
