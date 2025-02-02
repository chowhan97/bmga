// Copyright (c) 2022, Karthik Raman and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pick Put List', {
	onload: function(frm) {
		let so_name = frm.doc.sales_order;
		let company = frm.doc.company;
		if(so_name) {
			frappe.call({
				method: "bmga.bmga.doctype.pick_put_list.api.item_list_container",
				args: {
					so_name: so_name,
					company: company,
				}
			}).done((response) => {
				console.log(response.message)
				frm.doc.item_list = []
				$.each(response.message.pick_put_list, function(_i, e) {
					let entry = frm.add_child("item_list");
					entry.item = e.item_code;
					entry.uom = e.stock_uom;
					entry.batch = e.batch_no;
					entry.warehouse = e.warehouse;
					entry.quantity_to_be_picked = e.qty;
				})
				refresh_field("item_list")
			})
		}
	},

	refresh: function(frm) {

	}
});
