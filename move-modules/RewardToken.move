module 0xMerchant::RewardToken {
    use std::vector;
    use std::signer;
    use std::coin;

    // Minimal fungible token interface placeholder; adapt to Monad token standard
    resource struct RewardVault { balance: u128 }

    public fun init_vault(account: &signer) {
        move_to(account, RewardVault { balance: 0 });
    }

    public fun mint(to: &signer, amount: u128) {
        let addr = signer::address_of(to);
        if (!exists<RewardVault>(addr)) {
            move_to(to, RewardVault { balance: amount });
        } else {
            let v = &mut borrow_global_mut<RewardVault>(addr);
            v.balance = v.balance + amount;
        }
    }

    public fun get_balance(owner: &address): u128 {
        if (!exists<RewardVault>(*owner)) { return 0; }
        let v = borrow_global<RewardVault>(*owner);
        v.balance
    }
}