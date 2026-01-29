module 0xMerchant::ReceiptSBT {
    use std::vector;
    use std::signer;
    use std::timestamp;

    resource struct Receipt {
        id: u64,
        product_id: u64,
        minted_at: u64,
    }

    resource struct MerchantAuthority {}

    resource struct ReceiptHolder {
        receipts: vector<Receipt>
    }

    public fun init_merchant(account: &signer) {
        move_to(account, MerchantAuthority {});
    }

    public fun mint_receipt(merchant: &signer, to: &signer, token_id: u64, product_id: u64) {
        assert!(exists<MerchantAuthority>(signer::address_of(merchant)), 1);
        let now = timestamp::now_seconds();
        let r = Receipt { id: token_id, product_id, minted_at: now };
        if (!exists<ReceiptHolder>(signer::address_of(to))) {
            move_to(to, ReceiptHolder { receipts: vector::empty<Receipt>() });
        }
        let holder_ref = &mut borrow_global_mut<ReceiptHolder>(signer::address_of(to));
        vector::push_back(&mut holder_ref.receipts, r);
    }

    public fun owns_receipt(owner: &address, token_id: u64): bool {
        if (!exists<ReceiptHolder>(*owner)) { return false; }
        let holder_ref = borrow_global<ReceiptHolder>(*owner);
        let v = &holder_ref.receipts;
        let len = vector::length(v);
        let mut i = 0;
        while (i < len) {
            let r = vector::borrow(v, i);
            if (r.id == token_id) { return true; }
            i = i + 1;
        }
        false
    }
}