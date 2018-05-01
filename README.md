# bond-marketplace

A practical application on top of blockchain.

To Run Server :

1. Starting fabric: cd to startfabric.sh and createPeerAdminCard.sh and run both


2.  cd to project folder

3. Deploying Business Network
    a. composer network install --card PeerAdmin@hlfv1 --archiveFile bond-marketplace@<LATEST VERSION>.bna

    b. composer network start --networkName bond-marketplace --networkVersion <LATEST VERSION> --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

    c. composer card import --file networkadmin.card

    d. composer network ping --card admin@bond-marketplace

4. composer-rest-server to run server

5.  To set up server
 
    a. admin@bond-marketplace

    b, always use namespaces

    c. N

    d. Y

    e. n


Running Angular Application

1. cd bond-marketplace-gui

2. npm start
