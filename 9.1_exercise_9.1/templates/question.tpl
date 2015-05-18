<% for(var i = 1; i < total; ++i){%> 
<div id="question-<%=i%>-area" class="question-<%=i%>-area common-question-activity-area">
	<div id="display-question-<%=i%>-image" class="display-question-<%=i%>-image display-image">
		<img class="display-image-<%=i%>" alt=""></img>
	</div>
	<div id="result-image-question-<%=i%>" class="result-image-question-<%=i%> result-image">
		<img class="result-image-<%=i%>" alt=""></img>	
	</div>
	<div id="indentical-text-question-<%=i%>" class="indentical-text-question-<%=i%> identical-text"></div>
</div>
<%}%>