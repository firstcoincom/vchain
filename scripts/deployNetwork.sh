echo 'Enter version number'
read VERSION_NUMBER
composer network install --card PeerAdmin@hlfv1 --archiveFile bond-marketplace@${VERSION_NUMBER}.bna
composer network start --networkName bond-marketplace --networkVersion $VERSION_NUMBER --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
read -n 1 -s -r -p "Press any key to continue"
echo
