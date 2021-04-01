//IntersectionObserver & continew

//익명함수, 마지막 ()가 실행하는 부분임, 지역변수로 사용하기위해 이렇게 처리하셨다고함...!
//글과 이미지에 data-index라는 태그를 부여해주기 위해 반복분 사용
(() => {
  //새날아가는 함수
  const actions = {
    //actions라는 객체안에 birdFlies라는 메서드를 만든것.
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },

    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerWidth * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };

  //인덱스 붙이기
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; //첫 렌더시 0번째 이미지가 보이도록!
  let ioIndex;

  //최적화하기 - 전체 포문을 돌지않고 보이는애들만 돌도록 처리
  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1; // 0,1,2 찍힘, *1은 스트링을 숫자로 만들기 위함!
  });

  for (let i = 0; i < stepElems.length; i++) {
    //위에서 만들어준 io인스턴스가 stepElems[i]를 관찰해줌!
    io.observe(stepElems[i]);

    //data- 이렇게 생긴애들은 dataset으로 접근 가능함
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
    //이렇게도 쓸쑤 있음
    //stepElems[i].setAttribute('data-index', i)
  }

  //함수분리
  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true); // actions객체 안에있는 birdFlies메서드!!
      // console.log('action', action); //birdFlies
    }
  }

  function inactivate(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  //스크롤이벤트
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      // for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i]; //step클래스를 가진 애들이 찍히고
      if (!step) continue; // step이 없으면 패스하세요?의 의미래,,!
      boundingRect = step.getBoundingClientRect(); //그 아이들의 DOMRect가 찍힘?

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        //클래스이름 일단 제거하고 시작
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];

        //활성화된 이미지에 클래스이름 추가해주기
        activate(currentItem.dataset.action);
      }
    }
  });

  //새로고침시 스크롤 탑으로 이동***
  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate(); // 첫렌더시 activate함수를 호출하면, 0번째 이미지가 나타나면서 시작됨!
})();
