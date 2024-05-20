# Factory

[toc]

### 정의

> **팩토리 메소드 패턴(Factory Method Pattern)**에서는 객체를 생성할 때 필요한 인터페이스를 만든다. 어떤 클래스의 인스턴스를 만들지는 서브클래스에서 결정한다. 팩토리 메서드 패턴을 사용하면 클래스 인스턴스 만드는 일을 서브클래스에게 맡기게 된다.

## 문제 상황

피자 가게를 운영해보자. 아래는 피자를 주문하는 코드다.

```java
Pizza orderPizza() {
  Pizza pizza = new Pizza();
  
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  return pizza;
}
```

원하는 종류에 따라 피자를 만드는 코드를 추가한다.

```java
Pizza orderPizza(String type) {
  Pizza pizza;
  
  if (type.equals("cheese")) {
    pizza = new CheesePizza();
  } else if (type.equals("greek")) {
    pizza = new GreekPizza();
  } else if (type.equals("pepperoni")) {
    pizza = new PepperoniPizza();
  }
  
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  return pizza;
}
```

이제 피자의 종류만 전달하면 원하는 피자를 받을 수 있다.

위 코드의 문제점은 뭘까? 만약 신메뉴를 추가하고 별로 안 팔리는 그리스 피자를 메뉴에서 제외한다면 코드를 어떻게 수정해야 할까?

```java
Pizza orderPizza(String type) {
  Pizza pizza;
  
  if (type.equals("cheese")) {
    pizza = new CheesePizza();
  } // else if (type.equals("greek")) {
    // pizza = new GreekPizza();
  	// } 
		else if (type.equals("pepperoni")) {
    pizza = new PepperoniPizza();
  } else if (type.equals("clam")) { // 조개 피자 추가
      pizza = new ClamPizza();
    } else if (type.equals("veggie")) { // 야채 피자 추가
      pizza = new VeggiePizza();
    }
  
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  return pizza;
}
```

가장 문제가 되는 부분은(변화가 생기는 부분은) **인스턴스를 만드는 구상 클래스를 선택하는 부분**이다. 이 부분을 캡슐화해서 문제를 해결해보자.

## 해결 방법

### 간단한 팩토리(Simple Factory)

```java
public class SimplePizzaFactory {
  
  public Pizza createPizza(String type) {
    Pizza pizza = null;
  
    if (type.equals("cheese")) {
      pizza = new CheesePizza();
    } else if (type.equals("pepperoni")) {
      pizza = new PepperoniPizza();
    } else if (type.equals("clam")) {
        pizza = new ClamPizza();
    } else if (type.equals("veggie")) {
        pizza = new VeggiePizza();
    }
    return pizza;
  }
}
```

피자만 만들어서 전달하는 간단한 피자 팩토리 클래스를 생성했다. 피자를 원하는 다양한 클래스에서 사용할 수 있는 재사용 가능한 클래스이다.
이러한 객체 생성을 처리하는 클래스를 **팩토리(Factory)**라고 부른다.

이제 피자 가게에서 피자를 주문해보자.

```java
public class PizzaStore {
  SimplePizzaFactory factory;
  
  public PizzaStore(SimplePizzaFactory factory) {
    this.factory = factory;
  }
  
  public Pizza orderPizza(String type) {
    Pizza pizza;
    
    pizza = factory.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}
```

이렇게 하면 신메뉴를 추가하거나 기존 메뉴를 삭제하더라도 팩토리 클래스만 수정하면 된다. 하지만 여전히 조건문 분기 로직은 그대로 있기 때문에 변경에는 닫혀있는 상태다. 메뉴가 적거나 변경될 일이 적다면 간단한 팩토리도 나쁘지 않은 방법이다.

사실 **Simple Factory**는 디자인 패턴이라기보다 프로그래밍에서 자주 쓰이는 **기법**에 가깝다. 이제 진짜 팩토리 패턴을 알아보자.

### 팩토리 메소드 패턴(Factory Method Pattern)

피자 가게가 잘 되면서 프랜차이즈 사업을 하게 됐다. 지역별로 지점을 만들고 지금까지 잘 써왔던 코드를 다른 지점에서도 쓸 수 있도록 발전시켜 보자.
지점은 뉴욕 지점과 시카고 지점이 생길 예정이고 해당 지역 특성에 맞는 피자를 만들어야 한다.

기존의 `SimplePizzaFactory` 는 삭제하고 뉴욕과 시카고 피자 팩토리(`NYPizzaFactory`, `ChicagoPizzaFactory`)를 만든 다음, `PizzaStore`에서 적당한 팩토리를 사용하도록 한다.

```java
NYPizzaFactory nyFactory = new NYPizzaFactory(); // 뉴욕 스타일 피자를 만드는 팩토리
PizzaStore nyStore = new PizzaStore(nyFactory);
nyStore.orderPizza("Veggie"); // 뉴욕 지점에서 야채 피자 주문

ChicagoPizzaFactory chicagoFactory = new ChicagoPizzaFactory(); // 시카고 스타일 피자를 만드는 팩토리
PizzaStore chicagoStore = new PizzaStore(chicagoFactory);
chicagoStore.orderPizza("Veggie"); // 시카고 지점에서 야채 피자 주문
```

이렇게 코드를 구현했을 때 문제가 될 수 있는 부분은 뭘까?
지점이 생길 때마다  `PizzaStore` 클래스를 계속 수정해야 한다. 그리고 피자를 준비하고 굽고 자르고 포장하는 코드가 반복되거나 누락되는 실수가 발생할 수 있다.

이 문제를 해결하려면 `PizzaStore` 와 피자 제작 코드 전체를 하나로 묶어주면서 유연성을 잃어버리지 않는 프레임워크를 만들어야 한다.
먼저, 별도 메소드로 빼두었던 `createPizza(String type)` 메소드를 다시 `PizzaStore` 에 넣는다.

```java
public abstract class PizzaStore {
  
  public Pizza orderPizza(String type) {
    Pizza pizza;
    
    pizza = createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
   
    return pizza;
  }
  
  protected abstract Pizza createPizza(String type); // 팩토리 객체 대신 이 추상 메소드를 사용한다.
}
```

이제 각 지점에 맞는 서브 클래스를 만든다.

```java
public class NYPizzaStore extends PizzaStore {
    
    public Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new NYStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new NYStyleVeggiePizza();
        } else return null;
    }
}

public class ChicagoPizzaStore extends PizzaStore {

    public Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new ChicagoStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new ChicagoStyleVeggiePizza();
        } else return null;
    }
}
```

`PizzaStore`를 계속 고친 결과, 구상 클래스 인스턴스 만드는 일을 하나의 객체가 전부 처리하는 방식에서 일련의 서브클래스가 처리하는 방식으로 바꿨다. 이렇게 되면 `PizzaStore`는 어떤 피자 클래스 인스턴스가 생성되는지 알 수 없고 **사용하는 서브클래스에 따라 생산되는 객체 인스턴스가 결정된다.**

이제 피자 클래스를 만들어보자.

```java
public abstract class Pizza {

    String name;
    String dough;
    String sauce;
    List<String> toppings = new ArrayList<>();

    void prepare() {
        System.out.println("준비 중 : " + name);
        System.out.println("도우를 돌리는 중...");
        System.out.println("소스를 뿌리는 중...");
        System.out.println("토핑을 올리는 중 :");
        for (String topping : toppings) {
            System.out.println(" " + topping);
        }
    }

    void bake() {
        System.out.println("175도에서 25분 간 굽기");
    }

    void cut() {
        System.out.println("피자를 사선으로 자르기");
    }

    void box() {
        System.out.println("상자에 피자 담기");
    }

    public String getName() {
        return name;
    }
}
```

그리고 지점별 스타일의 피자 서브 클래스를 만들어보자.

```java
public class NYStyleCheesePizza extends Pizza {

    public NYStyleCheesePizza() {
        name = "뉴욕 스타일 소스와 치즈 피자";
        dough = "씬 크러스트 도우";
        sauce = "마리나라 소스";

        toppings.add("잘게 썬 레지아노 치즈");
    }
}

public class ChicagoStyleCheesePizza extends Pizza {

    public ChicagoStyleCheesePizza() {
        name = "시카고 스타일 딥 디쉬 치즈 피자";
        dough = "아주 두꺼운 크러스트 도우";
        sauce = "플럼 토마토 소스";

        toppings.add("잘게 조각 낸 모짜렐라 치즈");
    }

    void cut() {
        System.out.println("네모난 모양으로 피자 자르기");
    }
}
```

이제 각 지점의 피자를 주문해보자.

```java
public class PizzaTestDrive {

    public static void main(String[] args) {
        PizzaStore nyStore = new NYPizzaStore();
        PizzaStore chicagoStore = new ChicagoPizzaStore();

        Pizza pizza = nyStore.createPizza("cheese");
        System.out.println("아이유가 주문한 " + pizza.getName() + "\n");

        pizza = chicagoStore.createPizza("cheese");
        System.out.println("카리나가 주문한 " + pizza.getName() + "\n");
    }
}

// 아이유가 주문한 뉴욕 스타일 소스와 치즈 피자

// 카리나가 주문한 시카고 스타일 딥 디쉬 치즈 피자
```

지금까지의 내용들을 정리하자면, 팩토리 메소드 패턴은 객체를 만들어내는 공장을 만드는 패턴(`PizzaStore`의 `createPizza()` 추상 메소드)이라고 보면 된다. 그리고 어떤 클래스의 인스턴스(제품)를 만들지는 미리 정의한 공장 서브 클래스에서 결정한다.

그러므로 새로운 지점이 추가되더라도 **기존 코드를 변경하지 않고** `PizzaStore` 클래스의 서브 클래스로 추가 생성하고 해당 지점에 맞는 제품들(`Pizza` 객체의 구상 클래스)을 생성 하면 된다.

### 의존성 뒤집기 원칙

구상 클래스 의존성을 줄이면 좋다는 사실은 이제 확실히 알게 됐다. 이 내용을 표현하는 객체지향 디자인 원칙이 있다.

> **DIP(Dependency Inversion Principle)**
> 추상화된 것에 의존하게 만들고 구상 클래스에 의존하지 않게 만든다.

다른 원칙들과 마찬가지로 이 원칙 또한 항상 지켜야 하는 규칙은 아니다. 단지 우리가 지향해야 할 바를 알려 줄 뿐이다.
하지만 이 원칙을 완전히 습득한 상태에서 디자인한다면 원칙을 지키지 않은 부분을 명확하게 파악할 수 있으며, 합리적인 이유로 불가피한 상황에서만 예외를 둘 수 있다. 예를 들어, 어떤 클래스가 바뀌지 않는다면 그 클래스의 인스턴스를 만드는 코드를 작성해도 그리 큰 문제가 생기지 않는다.

실제로 대부분 String 객체의 인스턴스를 별 생각 없이 만들어서 쓴다. 엄밀하게 말하자면 이것도 원칙에 위배되는 일이지만 String 클래스가 바뀌는 일은 거의 없을 테니 문제가 생기지 않는다.

## 추상 팩토리 패턴

### 정의

> **추상 팩토리 패턴(Abstract Factory Pattern)**은 구상 클래스에 의존하지 않고도 서로 연관되거나 의존적인 객체로 이루어진 제품군을 생산하는 인터페이스를 제공한다. 구상 클래스는 서브클래스에서 만든다.
