$(function f() {
	var table, i, len, answer, tr, td, input, button, saved, p, question, next, highlight, isCorrect;
	table = $("#answers");
	if (table.length > 0) {			// for me to grade
		saved = localStorage.getItem("answer" + answerNumber);
		if (saved) {
			saved = saved.split(",");
		}
		len = data.length;
		for (i=0; i<len; i++) {
			answer = data[i];
			tr = $("<tr>");
			table.append(tr);
			td = $("<td>");
			tr.append(td);
			td.attr("valign", "top");
			td.html(answer.name);
			td = $("<td>");		
			tr.append(td);
			td.attr("valign", "top");
			p = $("<p>");
			td.append(p);
			p.html(answer.answer);
			td = $("<td>");
			tr.append(td);
			input = $("<input>");
			td.append(input);
			tr.attr("type", "text");
			if (saved) {
				input.val(saved[i]);
			}
		}
		
		upload = $("#upload");
		upload.click(doUpload);	
	} else {		// generate final result for a student
		table = $("#finalResult");
		len = data.length;
		tr = $("<tr>");
		table.append(tr);
		addcol(tr, "<th>", "Question");
		addcol(tr, "<th>", "Your answer");
		addcol(tr, "<th>", "Grading comment");
		addcol(tr, "<th>", "Correct answer");
		totalCorrectForChosen = 0;
		totalCorrectForOthers = 0;
		next = 0;
		for (i=0; i<len; i++) {
			tr = $("<tr>");
			table.append(tr);
			question = data[i];
			isCorrect = question.comment.trim()==='+';
			if (next<chosen.length && i+1 === chosen[next]) {
				highlight = true;
				if (isCorrect) {
					if (highlight) {
						totalCorrectForChosen++;
					}
				}
				next++;
			} else {			
				highlight = false;
				if (isCorrect) {
					totalCorrectForOthers++;
				}
			}
			addcol(tr, "<td>", question.question, highlight);
			addcol(tr, "<td>", question.answer);
			addcol(tr, "<td>", question.comment==="+" ? "OK" : "Not yet");
			addcol(tr, "<td>", question.correct);
		}
		p = $("#score");
		p.html(grade);
	}

	function addcol(tr, col, value, highlight) {
		var td, p
		td = $(col);
		tr.append(td);
		td.attr("valign", "top");
		if (highlight) {
			td.css("color", "red");
		}
		p = $("<p>");
		td.append(p);
		p.html(value);
	}
	
	function doUpload() {
		var inputs, input, len, i, comments, comment;		
		inputs = $("input");
		len = inputs.length;
		comments="";
		for (i=0; i<len; i++) {
			comment = inputs[i].value.trim();
			if (comment === "+" || comment ==="-") {
				comments += inputs[i].value;
				if (i !== len-1) {
					comments += ',';
				}
			} else {
				alert("Missing comment at " + data[i].name + ". Not uploaded");
				return;
			}
		}
		localStorage.setItem("answer"+answerNumber, comments);
		$.ajax({
  			method: "POST",
			url: "http://localhost:8080/jQueryExplorerServlet/Upload",
		    data: { answerNumber:answerNumber, comments:comments}
		})
	   .done(function( msg ) {
		    alert( "Data Saved: " + msg );		 
  		});		
	}
});