$(function() {
	var anchors, checkboxes, checked, tds;
	
	anchors = $("a");
	anchors.attr("target", "_blank");
	checkboxes = $("td>input:checkbox");		// checkbox pseudo class added after jquery-1.0.js
	var checked = localStorage.getItem("progress");
	if (checked) {			// restore state of checkboxes
		checked = JSON.parse(checked);
		checkboxes.each(function() {
			var me, id;
			me = $(this);
			id = me.attr("id");
			me.prop("checked", checked[id]);
		});
	} else {
		checked = {};
	}
	
	checkboxes.change(function() {
		checkboxes.each(function() {
			var me = $(this);
			var id = me.attr("id")
			checked[id] = me.prop("checked");
		});
		localStorage.setItem("progress", JSON.stringify(checked));					
	});	
});