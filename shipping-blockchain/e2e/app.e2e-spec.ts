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


describe('Starting tests for shipping-blockchain', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be shipping-blockchain', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('shipping-blockchain');
    })
  });

  it('network-name should be bond-marketplace@0.0.66',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('bond-marketplace@0.0.66.bna');
    });
  });

  it('navbar-brand should be shipping-blockchain',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('shipping-blockchain');
    });
  });

  
    it('Nomination component should be loadable',() => {
      page.navigateTo('/Nomination');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Nomination');
      });
    });

    it('Nomination table should have 29 columns',() => {
      page.navigateTo('/Nomination');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(29); // Addition of 1 for 'Action' column
      });
    });
  
    it('Discharge component should be loadable',() => {
      page.navigateTo('/Discharge');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Discharge');
      });
    });

    it('Discharge table should have 5 columns',() => {
      page.navigateTo('/Discharge');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Loading component should be loadable',() => {
      page.navigateTo('/Loading');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Loading');
      });
    });

    it('Loading table should have 6 columns',() => {
      page.navigateTo('/Loading');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
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

    it('ShippingCompany table should have 3 columns',() => {
      page.navigateTo('/ShippingCompany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
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
  

  
    it('Verification component should be loadable',() => {
      page.navigateTo('/Verification');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Verification');
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
  
    it('SetDischargeConnectTimestamp component should be loadable',() => {
      page.navigateTo('/SetDischargeConnectTimestamp');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetDischargeConnectTimestamp');
      });
    });
  
    it('SetDischargeDisconnectTimestamp component should be loadable',() => {
      page.navigateTo('/SetDischargeDisconnectTimestamp');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetDischargeDisconnectTimestamp');
      });
    });
  
    it('SetLoadingNORTemperedTimestamp component should be loadable',() => {
      page.navigateTo('/SetLoadingNORTemperedTimestamp');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetLoadingNORTemperedTimestamp');
      });
    });
  
    it('SetLoadingDocumentsOnBoardTimestamp component should be loadable',() => {
      page.navigateTo('/SetLoadingDocumentsOnBoardTimestamp');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetLoadingDocumentsOnBoardTimestamp');
      });
    });
  
    it('InitializeStuff component should be loadable',() => {
      page.navigateTo('/InitializeStuff');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('InitializeStuff');
      });
    });
  
    it('FinalizeNomination component should be loadable',() => {
      page.navigateTo('/FinalizeNomination');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('FinalizeNomination');
      });
    });
  
    it('CreateNomination component should be loadable',() => {
      page.navigateTo('/CreateNomination');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateNomination');
      });
    });
  

});