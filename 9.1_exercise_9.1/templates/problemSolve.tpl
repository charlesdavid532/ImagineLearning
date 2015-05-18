<div id="screen-area" class="screen-area">
  <div id="question-text-container" class="question-text-container">
    <div id="question-number" class="question-number"></div>
    <div id="question-text" class="question-text"></div>
  </div>
  <div id="stereogenic-btn-container" class="stereogenic-btn-container"></div>
  <div id="not-stereogenic-btn-container" class="not-stereogenic-btn-container"></div>
  <div id="correction-text" class="correction-text"></div>
  <div id="question-area" class="question-area"></div>
  <div id="explanation-text" class="explanation-text">
  </div>  
<div id="footer-container" class="footer-container">
  <%for(var i=0;i<total; ++i){%>
    <div id="footer-button-container-<%=i+1%>" class="footer-button-container-<%=i+1%> footer-button-container">
    <div id="footer-button-<%=i+1%>" class="footer-button-<%=i+1%> footer-button" buttonNumber="<%=i+1%>">    
    </div>
    </div>
  <%}%>
</div>
<div id="result-button" class="result-button"></div>
</div>
