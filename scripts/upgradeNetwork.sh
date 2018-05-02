echo 'Enter version number'
read VERSION_NUMBER
composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 --archiveFile bond-marketplace@${VERSION_NUMBER}.bna
composer network upgrade -c PeerAdmin@hlfv1 -n bond-marketplace -V $VERSION_NUMBER
