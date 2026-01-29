// SPDX-IGNORE
module 0xMerchant::ReviewRegistry {
    use std::vector;
    use std::string;
    use std::timestamp;
    use std::address;

    use 0xMerchant::ReceiptSBT; // cross-module check (adjust addresses as needed)

    struct Review has copy, drop, store {
        author: address,
        cid: vector<u8>,
        product_id: u64,
        token_id: u64,
        created_at: u64,
        flagged: bool,
    }

    resource struct Reviews {
        items: vector<Review>
    }

    public fun init_registry(account: &signer) {
        assert!(!exists<Reviews>(signer::address_of(account)), 1);
        move_to(account, Reviews { items: vector::empty<Review>() });
    }

    public fun post_review(poster: &signer, product_id: u64, token_id: u64, cid_bytes: vector<u8>) {
        let author = signer::address_of(poster);
        // Verify ownership of receipt via ReceiptSBT module
        let owns = ReceiptSBT::owns_receipt(&author, token_id);
        assert!(owns, 2);

        let now = timestamp::now_seconds();
        let review = Review { author, cid: cid_bytes, product_id, token_id, created_at: now, flagged: false };

        // For MVP we store registry under merchant account 0xMerchant
        let registry_addr: address = @0xMerchant;
        if (!exists<Reviews>(registry_addr)) {
            // If registry not initialized, revert (call init_registry first)
            assert!(false, 3);
        }
        let registry_ref = &mut borrow_global_mut<Reviews>(registry_addr);
        vector::push_back(&mut registry_ref.items, review);
    }

    public fun flag_review(admin: &signer, index: u64) {
        // ACL: admin must be the merchant (improve with multisig in production)
        let admin_addr = signer::address_of(admin);
        assert!(admin_addr == @0xMerchant, 4);
        let registry_ref = &mut borrow_global_mut<Reviews>(@0xMerchant);
        let r = vector::borrow_mut(&mut registry_ref.items, index);
        r.flagged = true;
    }

    public fun get_reviews_count(): u64 {
        if (!exists<Reviews>(@0xMerchant)) { return 0; }
        let registry_ref = borrow_global<Reviews>(@0xMerchant);
        let len = vector::length(&registry_ref.items);
        len
    }
}