# DOM

DOM은 문서 객체 모델(The Document Object Model)의 줄임말로 **HTML, XML 문서의 프로그래밍 Interface** 이다.
DOM은 문서의 구조화된 표현(structured representation)을 제공하며 **프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공**하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다. DOM은 nodes와 objects로 문서를 표현하며 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에서 사용될 수 있게 연결시켜주는 역할을 한다.

웹 페이지는 일종의 문서(document)다. 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 웹 브러우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다. DOM은 동일한 문서를 표현하고, 저장하고, 조작하는 방법을 제공한다. DOM은 웹 페이지의 객체 지향 표현이며, JavaScript와 같은 스크립팅 언어를 이용해 DOM을 수정할 수 있다.

> DOM은 프로그래밍 언어가 웹 페이지를 조작할 수 있는 기능을 제공하고 스크립팅 언어를 통해 수정될 수 있다.

DOM은 프로그래밍 언어는 아니지만 DOM이 없다면 JavaScript 언어는 웹 페이지 또는 XML 페이지 및 요소들과 관련된 모델이나 개념들에 대한 정보를 갖지 못하게 된다. 문서의 모든 element(전체 문서, 헤드, 문서 안의 table, table header, table cell 안의 text)는 문서를 위한 document object model의 한 부분이다. 때문에 DOM과 JavaScript와 같은 스크립팅 언어를 통해 접근하고 조작할 수 있는 것이다.

초창기에는 JavaScript와 DOM이 밀접하게 연결되어 있었지만, 나중에는 각각 분리되어 발전해왔다. 페이지 콘텐츠는 DOM에 저장되고 JavaScript를 통해 접근하거나 조작할 수 있다.

DOM 은 프로그래밍 언어와 독립적으로 디자인되었다. 때문에 문서의 구조적인 표현은 단일 API 를 통해 이용 가능하다. 따라서 JavaScript 뿐 아니라 어떠한 언어에서도 DOM 의 구현이 가능하다.