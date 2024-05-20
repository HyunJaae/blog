# Overloading & Overriding

## Overloading

오버로딩은 **메서드의 이름이 같더라도 매개변수의 개수 또는 타입이 다르면 정의하여 사용할 수 있음**을 뜻한다.

오버로딩은 사전적으로 '과적하다' 라는 뜻이다. C 언어에서는 함수명이 고유하게 존재해야 한다. 하지만 자바에서는 하나의 메서드 이름으로 여러 기능을 구현하기 때문에 '과적하다' 라는 뜻의 이름을 붙여준 것으로 보인다.

### 특징

1. 메서드 이름이 같아야 한다.
2. **리턴 타입만 다른 경우, 오버로딩할 수 없다.**
3. **접근 제어자만 다른 경우, 오버로딩할 수 없다.**
4. 파라미터 개수가 달라야 한다.
5. 파라미터 개수가 같을 경우, 데이터 타입이 달라야 한다.

### 예시

```java
class OverloadingTest {
  public static void main(String[] args) {
    OverloadingMethods om = new overloadingMethods();
    
    om.print();
    System.out.println(om.print(3));
    om.print("Hello!");
    System.out.println(om.print(4, 5));
  }
}

class OverloadingMethods {
  public void print() {
    System.out.println("overloading1");
  }
  
  String print(Integer i) {
    System.out.println("overloading2");
    return i.toString();
  }
  
  void print(String s) {
    System.out.println("overloading3");
    System.out.println(s);
  }
  
  String print(Integer i, Integer j) {
    System.out.println("overloading4");
    return i.toString() + j.toString();
  }
}
```

- 결과

```shell
overloading1
overloading2
3
overloading3
Hello!
overloading4
45
```



### 사용하는 이유

1. 같은 기능을 하는 메서드를 하나의 이름으로 사용할 수 있다.

위 예시에서도 사용한 `println()` 함수를 오버로딩의 대표적인 예로 볼 수 있다. `println()` 의 인자 값으로 다양한 타입과 개수의 매개변수를 전달해도 구체적으로 어떻게 해당 함수가 실행되는지는 모르지만 출력이라는 우리가 기대한 행동을 실행한다.

2. 메서드의 이름을 절약할 수 있다.

위 예시에서의 `println()` 을 생각해보자. 만약 전달되는 매개변수 타입에 따라 메서드 이름이 달라져야 한다면 `printlnInt()`, `printlnString()` 등 수많은 메서드의 이름을 생성해야 한다. 이는 개발자에게 메서드 네이밍에 대한 고민을 가중시킨다.

## Overriding

오버라이딩은 **부모 클래스로부터 상속 받은 메서드를 자식 클래스에서 재정의하는 것**을 뜻한다. 그렇기 때문에 자식 클래스에서는 오버라이딩하고자 하는 **메서드의 이름, 매개변수, 리턴 값이 모두 같아야 한다.**

### 예시

```java
public class OverridingTest {

	public static void main(String[] args) {
		Duck duck = new Duck();
		RubberDuck rubberDuck = new RubberDuck();
		DecoyDuck decoyDuck = new DecoyDuck();
		
		duck.quack();
		rubberDuck.quack();
		decoyDuck.quack();
	}
}

class Duck {
	void quack() {
		System.out.println("꽥꽥");
	}
}

class RubberDuck extends Duck {
	@Override
	protected void quack() {
		System.out.println("삑삑");
	}
}

class DecoyDuck extends Duck {
	@Override
	public void quack() {
		System.out.println("...");
	}
}
```

- 결과

```shell
꽥꽥
삑삑
...
```

### @Override

`@` 는 어노테이션이라고 부르며 직역하자면 주석이라는 뜻이다. 이는 일반적인 주석과 다르게 검증하는 기능을 한다. 여기서 사용된 `@Override` 어노테이션은 오버라이딩을 검증하는 기능을 한다. 오버라이딩이 제대로 시행되지 않았다면 컴파일 오류를 출력한다.

위 예시 코드를 보면 접근 제어자를 다르게 설정해 놓은 것을 볼 수 있다. 오버라이딩에서는 접근 제어자를 설정하는 규칙이 존재한다.

1. **자식 클래스에서 오버라이딩하는 메서드의 접근 제어자는 부모 클래스보다 더 좁게 설정할 수 없다.**

위 예시에서 부모 클래스(`Duck`)의 접근 제어자는 `default`로 되어 있다. 여기서 자식 클래스는 `default`와 같거나 더 넓은 범위의 접근 제어자만 설정할 수 있기 때문에 `default`, `protected`, `public` 접근 제어자만 설정이 가능하다.(`private` 접근 제어자는 불가)

> 접근 제어자는 `private` < `default` < `protected` < `public` 순으로 보다 많은 접근을 허용한다.
>
> 접근 제어자를 별도로 설정하지 않는다면 default 접근 제어자가 자동으로 설정되어 같은 패키지 안에서만 접근이 가능하다.

2. **예외는 부모 클래스의 메서드보다 많이 선언할 수 없다.**

부모 클래스에서 어떤 예외를 처리한다고 하면 자식 클래스에서는 해당 예외보다 더 큰 예외를 처리할 수 없다.

3. **`static` 메서드를 인스턴스의 메서드 또는 그 반대로 변경할 수 없다.**

부모 클래스의 `static` 메서드를 자식 클래스에서 같은 이름으로 정의할 수 있으나 이는 재정의가 아닌 새로운 메서드를 생성하는 것이다.



> **자식 클래스의 접근 제어자가 부모 클래스보다 더 넓은 범위여야 하는 이유**
>
> 1. 서브타이핑(Subtyping) 규칙 : 자식 클래스는 부모 클래스의 하위 유형이어야 한다. 즉, 자식 클래스는 부모 클래스의 모든 동작을 보장해야 한다.
> 1. Liskov 치환 원칙(Liskov Substitution Principle, LSP) : LSP는 서브 타입을 상위 타입으로 대체할 수 있어야 한다는 원칙이다. 만약 자식 클래스에서 오버라이딩된 메소드의 접근 제어자가 더 좁게 설정된다면, 이를 대체할 수 없게 되어 LSP에 위배된다.



