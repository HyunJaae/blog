---
title: "HTTP vs Socket"
date: 2022-07-07T16:42:08+09:00
slug: ""
description: "HTTP와 Socket의 차이"
keywords: [HTTP, Socket]
draft: false
tags: [HTTP, Socket]
math: false
toc: false
---

## HTTP(HyperText Transfer Protocol)
<U>하이퍼 텍스트를 주고 받기 위한 규칙(통신 규약)</U>을 말합니다.
여기서 **HyperText** 란 **연결 고리를 통해 다른 문서로 접근할 수 있는 텍스트**를 말합니다.
HTML의 <a 태그>를 떠올리면 이해하기 좋습니다. HTTP 라는 통신 규약을 만든 것은 좋지만 정작 하이퍼 텍스트를 보기 좋게 표현할 방법이 없었습니다. 누구든 동일한 방법으로 하이퍼 텍스트를 표현할 방법이 필요했습니다.
**이에 팀 버너스리는 인터넷 기반의 하이퍼 텍스트 작성을 위한 방법들을 만들었는데, 그것이 바로 현재의 HTML 입니다.**
- 아래는 HTTP에 대한 [위키백과](https://ko.wikipedia.org/wiki/HTTP)의 정의입니다.

> **웹 서비스에서 클라이언트와 서버 간에 정보를 요청(request)하고 응답(response) 받기 위한 프로토콜**을 말한다.
> 초기에는 서버로부터 페이지를 요청하는 GET이라는 이름의 하나의 메소드만 있었다. 서버로부터의 응답은 무조건 HTML 문서였다. 그러나 프로토콜 확장의 필요성으로 HTTP/1.0에서는 메소드와 헤더가 추가되고, 현재는 HTTP/1.1을 가장 많이 사용한다.
> HTTP/2에서는 성능이 개선되고, HTTP/3은 TCP 대신 UDP를 사용하여 성능을 개선 중이다.

## HTTP의 특징
### 1. 클라이언트 - 서버 구조
클라이언트의 **요청**이 있을 때만 서버에서 요청에 따른 **응답**을 반환합니다. 
클라이언트에서 서버에 요청을 하는 **단방향 통신**으로, 서버가 먼저 요청을 할 수 없고 무조건 요청을 받아야 합니다.
> #### **단방향 통신의 단점은?**
> A(클라이언트)와 B(서버)가 채팅을 하는데, B가 A한테 먼저 톡을 보낼 순 없습니다.

### 2. 무상태(stateless) 프로토콜 지향
**서버가 클라이언트의 연결/상태 정보를 보존하지 않습니다.**
즉, 클라이언트가 이전 요청과 **같은 데이터를 원한다고 하더라도 다시 서버에 동일한 요청을 해야 합니다.**
클라이언트가 이전에 자신이 요청한 정보를 저장해놓고 해당 정보를 다시 보내주므로, 클라이언트의 요청에 어떤 서버가 응답해도 상관이 없어서 **서버 확장성이 높은 장점**이 있는 반면, **클라이언트가 많은 양의 추가 데이터를 전송해야 하는 단점**이 있습니다. 하지만 로그인 같은 상태 정보는 서버에 유지시켜야 하는데 이 경우 브라우저 쿠키나 세션 등을 이용해 상태를 유지해야 합니다.
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3i46w%2FbtrnWRNFe6R%2FJczosRSrLxS8sSmUft5JgK%2Fimg.png)
### 3. 비연결성
클라이언트가 서버에 요청을 하고 **응답을 받으면 바로 TCP/IP 연결을 끊어 연결을 유지하지 않는 것**입니다.
이를 통해 서버의 자원을 효율적으로 관리하고, 수많은 클라이언트의 요청에도 대응할 수 있게 합니다. **HTTP는 연결을 유지하지 않는 모델을 기본으로 합니다.**
수 천명이 서비스를 사용해도 실제 서버에서 0.000001초까지 동일한 시간에 동시에 요청을 하지는 않습니다.
#### 비연결성의 한계와 해결
- **한계**
새로 연결될 때마다 TCP/IP 연결을 새로 맺어야 하므로 3-way handshake에 따른 시간이 추가됩니다.
(HTML을 받기 위해 연결하고 종료 -> 자바스크립트 파일을 받기 위해 연결하고 종료)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCZfPx%2FbtrnX0p5waj%2FrVPMNFazqcKt4mtRXxB5wk%2Fimg.png)

- **해결**
HTTP 지속 연결(Persisten Connections)을 통해 이를 해결합니다.
처음 연결이 되고 나서, 여러 파일의 요청/응답이 다 끝난 뒤 연결을 종료합니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOo48t%2FbtrnV5MdQx5%2Fj1EkwZVpokC5v4lIEqxKK1%2Fimg.png)

### 4. HTTP 메세지를 통해 통신
HTTP메세지는 HTTP 요청메세지와 HTTP 응답메세지로 구분된다.
HTTP메세지에 모든 것을 전송할 수 있다. HTML, TEXT, 음성, 영상, 파일, JSON, XML 등등

- **기본 구조**
  - **<span style = "color:#8A2BE2">start-line :</span>** 시작 라인
  - **<span style = "color:#8A2BE2">header :</span>** 헤더
  - **<span style = "color:#8A2BE2">empty line :</span>** 공백 라인(CRLF, 필수)
  - **<span style = "color:#8A2BE2">message :</span>** body
  

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIeSLc%2Fbtrn14dJdcq%2FmY4E7gMi0gjNpoWSU95eP0%2Fimg.png)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbj32HX%2Fbtrn0X1gQrd%2FJQ6vpXmXtTqfUVltE7uxx1%2Fimg.png)

> #### Socket 통신은 왜 필요할까요?
> HTTP는 **단방향 통신**이기 때문에 서버가 클라이언트에게 먼저 메세지를 보낼 수 없습니다.
> 실시간 채팅 기능과 같이 **지연이 짧아야 하는 많은 양의 데이터를 자주 통신해야 할 때** 서버도 클라이언트에게 요청을 보낼 수 있는 **<u>양방향 통신</u>**이 필요하기 때문입니다.

## Socket 통신
아래는 위키백과의 정의입니다.

>  **소켓**(Socket)이란 <u>네트워크 상에서 동작하는 프로그램 간 통신의 종착점(Endpoint), 접속의 끝 부분</u>이라 합니다.
> 종착점인 Endpoint는 IP 주소와 Port 번호의 조합으로 이루어진 최종 목적지(PC, 핸드폰 등의 접속 연결부)를 나타냅니다.
> 클라이언트(프로그램 1)와 서버(프로그램 2) 양쪽에서 서로에게 데이터 전달을 하는 방식의 **<u>양방향 통신</u>**으로, 소켓에서 서버는 요청을 기다릴 필요가 없습니다. 모든 연결은 2개의 Endpoint로 유일하게 식별될 수 있습니다.

조금 더 쉽게 얘기하자면,
소켓은 사전적으로 '전구 따위를 끼워 넣어 접속하게 하는 기구, 연결부'를 일컫는데 콘센트 구멍을 떠올리면 쉽습니다.
즉, 네트워크 상에서의 소켓은 멀리 떨어진 프로그램끼리 연결될 수 있게 만들어진 연결부인 것입니다.

예를 들어, 휴대폰(프로그램 A)을 충전하기 위해 휴대폰 연결부 소켓과 보조배터리(프로그램 B)에 충전선을 꽂는 연결부 소켓이 있어야 합니다. 또한 전기 충전이 제대로 작동되려면 220v라는 표준 규격에 맞게 만들어져야 하는 것처럼, **소켓 통신도 TCP, UDP 규약에 맞는 소켓을 미리 만들어 소켓에 꽂아 쓴다는 개념으로 프로그램 간에 데이터를 교환**할 수 있습니다.

보통 스트리밍이나 실시간 채팅 등 실시간으로 데이터를 주고 받아야 하는 경우 Connection을 자주 맺고 끊는 HTTP 통신보다 소켓 통신이 적합합니다. 하지만, 소켓 통신은 계속해서 Connection을 들고 있기 때문에 HTTP 통신에 비해 많은 리소스가 소모됩니다.
