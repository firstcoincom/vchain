# Shipping-Blockchain

A practical application on top of blockchain.


## Install

To install the server:

Install vchain dependencies:

1. Install [Docker](https://www.docker.com/community-edition)
2. Install the [Hyperledger Fabric Composer development environment](https://hyperledger.github.io/composer/latest/installing/development-tools.html) 

To run the server for the first time:

1. cd to fabric-dev-servers folder

2. Start fabric: ```./startfabric.sh``` 

3. Create admin card ```./createPeerAdminCard.sh``` 

4. cd to ~/vchain folder

5. Deploy the business network by running ```scripts/deployNetwork.sh``` and enter the version number in the package.json file (currently ```0.1.8```)

6. Start REST server (path to server should be included in Bash path on MacOS): ```composer-rest-server```. Enter ```admin@bond-marketplace``` as business card and accept all default values after

7. cd to ~/vchain/shipping-blockchain folder

8. Install blockchain frontend: ```npm install```

9. Run Angular app: ```npm start```

10. Start the email server by ```cd ../nodejs-email``` and ```node emailSender USERNAME PASSWORD``` where USERNAME and PASSWORD are the Gmail credentials the emails will be sent from.

The server should now be reachable at ```http://localhost:4200```

## Restart

To restart the server (e.g. after a reboot):

1. cd to fabric-dev-servers folder

2. Start fabric: ```./startfabric.sh``` 

3. Start REST server (path to server should be included in Bash path on MacOS): ```composer-rest-server```. Enter ```admin@bond-marketplace``` as business cardand accept all default values after (always use namespaces, N, Y, N)

4. cd to ~/vchain/shipping-blockchain folder

5. Run Angular app: ```npm start```

6. Start the email server by ```cd ../nodejs-email``` and ```node emailSender USERNAME PASSWORD``` where USERNAME and PASSWORD are the Gmail credentials the emails will be sent from.

## Updating to a new vchain version
After a pull from Github with a new version, new model, follow the following stepts:

1. Upgrade the business network by running ```scripts/upgradeNetwork.sh``` and enter the version number in the package.json file (currently ```0.1.8```)

2. Restart REST server (path to server should be included in Bash path on MacOS): ```composer-rest-server```. Enter ```admin@bond-marketplace``` as business cardand accept all default values after (always use namespaces, N, Y, N)

4. cd to ~/vchain/shipping-blockchain folder

5. Restart Angular app: ```npm start```

6. Restart the email server by ```cd ../nodejs-email``` and ```node emailSender USERNAME PASSWORD``` where USERNAME and PASSWORD are the Gmail credentials the emails will be sent from.

## Errors
- Error 401: Unauthorized. Wrong composer-rest-server options entered. Run ```composer-rest-server``` again, with ```admin@bond-marketplace``` as business card and with default values for all other options.
- Error: 504 - Gateway Timeout. REST server isn't running. See solution for error 401.
- Error: xxx - Server Error. Fabric isn't running. Start fabric ```./startfabric.sh``` in the fabric-dev-servers folder