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

5. Deploy the business network by running ```scripts/deployNetwork.sh``` and enter the version number in the package.json file (currently ```0.1.7```)

6. Start REST server (path to server should be included in Bash path on MacOS): ```composer-rest-server```. Enter ```admin@bond-marketplace``` as business card and accept all default values after

7. cd to ~/vchain/shipping-blockchain folder

8. Install blockchain frontend: ```npm install```

9. Run Angular app: ```npm start```

10. The server should be reachable on ```http://localhost:4200```

## Restart

To restart the server (e.g. after a reboot):

1. cd to fabric-dev-servers folder

2. Start fabric: ```./startfabric.sh``` 

3. Start REST server (path to server should be included in Bash path on MacOS): ```composer-rest-server```. Enter ```admin@bond-marketplace``` as business cardand accept all default values after (always use namespaces, N, Y, N)

7. cd to ~/vchain/shipping-blockchain folder

8. Run Angular app: ```npm start```

## Updating to a new vchain version
1. Deploy the business network by running ```scripts/deployNetwork.sh``` and enter the version number in the package.json file (currently ```0.1.7```)
2. Follow the steps in [Restart](#restart)

## Errors
- Error 401: Unauthorized. Wrong composer-rest-server options entered. Run ```composer-rest-server``` again, with ```admin@bond-marketplace``` as business card and with default values for all other options.
- Error: 504 - Gateway Timeout. REST server isn't running. See solution for error 401.
- Error: xxx - Server Error. Fabric isn't running. Start fabric ```./startfabric.sh``` in the fabric-dev-servers folder