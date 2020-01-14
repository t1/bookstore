# see https://help.ubuntu.com/community/EC2StartersGuide

# install

WILDFLY_VERSION=18.0.0.Final

alias l='ls -lahF'
sudo apt-get -y update
sudo apt-get -y dist-upgrade
sudo apt-get -y install httpie
sudo apt-get -y install openjdk-11-jdk-headless
http --download https://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz
tar xzf wildfly-$WILDFLY_VERSION.tar.gz
ln -s wildfly-$WILDFLY_VERSION wildfly

# start
~/wildfly/bin/standalone.sh -b 0.0.0.0

# config
~/wildfly/bin/jboss-cli.sh --connect
/subsystem=logging/console-handler=CONSOLE:write-attribute(name=level,value=ALL)

# deploy
set --export --local WORKER ec2-35-158-97-189.eu-central-1.compute.amazonaws.com
scp -i /Users/rdohna/.ssh/aws.pem /Users/rdohna/workspace/t1/kub-ee/.links/deployer.config.yaml ubuntu@$WORKER:wildfly/standalone/configuration/
scp -i /Users/rdohna/.ssh/aws.pem /Users/rdohna/workspace/t1/kub-ee/.links/deployer.root.bundle ubuntu@$WORKER:wildfly/standalone/configuration/
scp -i /Users/rdohna/.ssh/aws.pem target/deployer.war ubuntu@$WORKER:wildfly/standalone/deployments/

ssh -i /Users/rdohna/.ssh/aws.pem ubuntu@$WORKER
