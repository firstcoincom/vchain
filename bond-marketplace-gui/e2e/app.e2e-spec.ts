/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for bond-marketplace-gui', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be bond-marketplace-gui', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('bond-marketplace-gui');
    })
  });

  it('network-name should be bond-marketplace@0.0.39',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('bond-marketplace@0.0.39.bna');
    });
  });

  it('navbar-brand should be bond-marketplace-gui',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('bond-marketplace-gui');
    });
  });

  
    it('Contract component should be loadable',() => {
      page.navigateTo('/Contract');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Contract');
      });
    });

    it('Contract table should have 25 columns',() => {
      page.navigateTo('/Contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(25); // Addition of 1 for 'Action' column
      });
    });
  
    it('Option1 component should be loadable',() => {
      page.navigateTo('/Option1');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Option1');
      });
    });

    it('Option1 table should have 3 columns',() => {
      page.navigateTo('/Option1');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Option2 component should be loadable',() => {
      page.navigateTo('/Option2');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Option2');
      });
    });

    it('Option2 table should have 3 columns',() => {
      page.navigateTo('/Option2');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Option3 component should be loadable',() => {
      page.navigateTo('/Option3');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Option3');
      });
    });

    it('Option3 table should have 3 columns',() => {
      page.navigateTo('/Option3');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('ContractEvent component should be loadable',() => {
      page.navigateTo('/ContractEvent');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ContractEvent');
      });
    });

    it('ContractEvent table should have 7 columns',() => {
      page.navigateTo('/ContractEvent');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Vessel component should be loadable',() => {
      page.navigateTo('/Vessel');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Vessel');
      });
    });

    it('Vessel table should have 3 columns',() => {
      page.navigateTo('/Vessel');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Terminal component should be loadable',() => {
      page.navigateTo('/Terminal');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Terminal');
      });
    });

    it('Terminal table should have 2 columns',() => {
      page.navigateTo('/Terminal');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Pilot component should be loadable',() => {
      page.navigateTo('/Pilot');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Pilot');
      });
    });

    it('Pilot table should have 2 columns',() => {
      page.navigateTo('/Pilot');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Captain component should be loadable',() => {
      page.navigateTo('/Captain');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Captain');
      });
    });

    it('Captain table should have 2 columns',() => {
      page.navigateTo('/Captain');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('TowageCompany component should be loadable',() => {
      page.navigateTo('/TowageCompany');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('TowageCompany');
      });
    });

    it('TowageCompany table should have 2 columns',() => {
      page.navigateTo('/TowageCompany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('ShippingCompany component should be loadable',() => {
      page.navigateTo('/ShippingCompany');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ShippingCompany');
      });
    });

    it('ShippingCompany table should have 2 columns',() => {
      page.navigateTo('/ShippingCompany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('Charterer component should be loadable',() => {
      page.navigateTo('/Charterer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Charterer');
      });
    });

    it('Charterer table should have 4 columns',() => {
      page.navigateTo('/Charterer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('VoyageManager component should be loadable',() => {
      page.navigateTo('/VoyageManager');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('VoyageManager');
      });
    });

    it('VoyageManager table should have 4 columns',() => {
      page.navigateTo('/VoyageManager');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('UpdateETA component should be loadable',() => {
      page.navigateTo('/UpdateETA');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateETA');
      });
    });
  
    it('AddEvent component should be loadable',() => {
      page.navigateTo('/AddEvent');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddEvent');
      });
    });
  

});