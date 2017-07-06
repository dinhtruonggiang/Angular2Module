import { Emma.BravoPluss.UIPage } from './app.po';

describe('emma.bravo-pluss.ui App', () => {
  let page: Emma.BravoPluss.UIPage;

  beforeEach(() => {
    page = new Emma.BravoPluss.UIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
