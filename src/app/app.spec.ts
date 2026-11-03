import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  // antes de cada prueba, se ejecuta este bloque de codigo
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zonelessCalculator');
  // });

  it('should be 4', () => {

    // arrange
    const number1 = 2;
    const number2 = 2;

    // act
    const result = number1 + number2;

    // assert

    expect(result).toBe(4);
  });

  it('should create the app', () => {

    // fixture es un ambiente controlado para probar
    const fixture = TestBed.createComponent(App);

    // es la instancia del componente
    const appComponent = fixture.componentInstance;
    // console.log(appComponent.title())
    // console.log(appComponent.method1())

    // compile, compilado, app html 
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log('all html ', compiled.innerHTML);
    // console.log('html thing ', compiled.querySelector('a')?.innerHTML);
    expect(appComponent).toBeTruthy();
  });


  it('should render router-outlet', () => {

    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML)
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();

  });
  it('should render router-outlet with css class', () => {

    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mustHaveClass = "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5"
    // console.log('divElement?.classList', divElement?.classList.value)
    mustHaveClass.split(' ').forEach((className) => {
      expect(divElement?.classList.contains(className)).toBeTruthy();
      expect(mustHaveClass).toContain(className);
    })

  });
  it('should render  buy me a beer link', () => {

    // fixture
    const fixture = TestBed.createComponent(App);

    // compiled
    const compiled = fixture.nativeElement as HTMLElement;

    // linkElement
    const linkElement = compiled.querySelector('a');
    expect(linkElement).toBeTruthy();

    const getTitle = linkElement?.getAttribute('title');
    const getHref = linkElement?.getAttribute('href');
    const getTarget = linkElement?.getAttribute('target');

    expect(getTitle).toBe('Buy me a beer');
    expect(getHref).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(getTarget).toBe('_blank');
    console.log("compiled.innerHTML: ", linkElement?.innerHTML)

  });


});
