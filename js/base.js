function LoadNAVBAR() {
    //document는 DOM 트리의 최상위 객체 즉, HTML 문서를 하위에 둬서 제어 가능.
    //*에 대해서=모든 요소에 대해서 다 찾음
    //document.getElementsByTagName('*')을 통해 모든 html의 요소를 읽어온 후 allElements 배열에 초기화
    const allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) { //읽어온 html파일 개수만큼 반복(순회)
        var el = allElements[i];            //el에 html파일 하나씩 가리키게 함.

        //가져온 html파일에서 nav-include-path 태그를 속성으로 얻어옴.(접근)
        var navpath = el.getAttribute("nav-include-path");
        if (navpath) {   //nav-include-path 속성이 있으면
            // XMLHttpRequest 객체를 생성
            var xhttp = new XMLHttpRequest();
            //xhttp에서 상태 변화가 있으면 받아오고 함수를 실행함
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //레디스테이트가 4면 요청데이터 처리완료되어 응답준비된 상태
                    //스테이터스 200은 서버에 문서가 존재한다는 것
                    //이때 this는 xhttp를 가리킴.
                    //여기서 function은 메소드, xhttp는 인스턴스이고 onreadystatechange, readyState,status 등은 파라미터
                    el.innerHTML = this.responseText; //el.innerHTML을 xhttp의 응답으로 초기화
                    el.removeAttribute("nav-include-path"); //nav-include-path 속성을 제거
                    LoadNAVBAR(); //재귀호출로 다시 처리 --> 근데 다시 실행할 이유가 있나? 어차피 루프를 돌고 있는데?
                    /*--> LoadNAVBAR() 함수는 HTML 문서에서 nav-include-path 속성을 가진 요소를 찾아
                    해당 경로의 내용을 가져와 삽입함. 이 과정에서 가져온 콘텐츠 안에 또 다른 nav-include-path 속성을 가진
                    요소가 있을 수 있음. 따라서 해당 요소에 대해서도 처리를 위해 재귀 호출을 사용함.
                      -->가져온 html 안에도 nav-include-path속성이 있을 수 있으니까 재귀 호출 한다는 의미(?)
                     */
                }
            }
            xhttp.open("GET", navpath, true); //navpath에 지정된 url에서 데이터를 가져옴.
            //GET은 요청방법 지정 파라미터, 서버로부터 데이터를 요청.
            //navpath 요청 보낼 url 지정 파라미터. nav-include-path="./layout/navbar.html"를 불러옴.
            //async :true 비동기식으로 요청을 처리, 코드가 요청을 보낸 후 응답을 기다리지 않고 다음 코드를 실행
            xhttp.send();  //서버로 요청이 전송
            return; //함수 실행 종료. void라 리턴값 없음
        }
    }
}

    /*위의 LoadNAVBAR와 구현 방식은 동일하나
    html파일에서
    <div nav-include-path="./layout/navbar.html"></div>
    <div footer-include-path="./layout/footer.html"></div>
     이 두 개의 div의 위치를 달리해주면서 어디로 navbar.html과 footer.html을 속성에 맞춰 로드해올 것인지 정함
     */
function LoadFOOTER() {
    //*에 대해서 모든 html파일 다 찾음 *이 다 찾는다는 의미.
    const allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) { //html파일 끝까지
        var el = allElements[i];

        var footerpath = el.getAttribute("footer-include-path");  //올엘리먼츠 배열의 모든 속성을 가져옴.
        if (footerpath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //레디스테이트가 4면 요청데이터 처리완료되어 응답준비된 상태
                    //스테이터스 200은 서버에 문서가 존재한다.
                    el.innerHTML = this.responseText;
                    el.removeAttribute("footer-include-path");
                    LoadFOOTER();


                }
            }
            xhttp.open("GET", footerpath, true);
            xhttp.send();
            return;
        }
    }
}