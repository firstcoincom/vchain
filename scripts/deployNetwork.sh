echo 'Initially deploys the business network.'
echo 'Use "upgradeNetwork.sh" to make changes to the existing business network.'
echo 'Enter version number:'
read VERSION_NUMBER
composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 --archiveFile bond-marketplace@${VERSION_NUMBER}.bna
composer network start --networkName bond-marketplace --networkVersion $VERSION_NUMBER --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
