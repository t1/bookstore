# see https://help.ubuntu.com/community/EC2StartersGuide

# install

WILDFLY_VERSION=18.0.0.Final

alias l='ls -lahF'
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install httpie
sudo apt-get install openjdk-11-jdk-headless
http --download https://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz
tar xzf wildfly-$WILDFLY_VERSION.tar.gz
ln -s wildfly-$WILDFLY_VERSION current

# start
~/current/bin/standalone.sh -b 0.0.0.0

# config
~/current/bin/jboss-cli.sh --connect
/subsystem=logging/console-handler=CONSOLE:write-attribute(name=level,value=ALL)

# deploy
AWS_SERVER_NAME=ec2-18-196-165-203.eu-central-1.compute.amazonaws.com
scp -i /Users/rdohna/.ssh/aws.pem target/books.war ubuntu@$AWS_SERVER_NAME:
ssh -i /Users/rdohna/.ssh/aws.pem ubuntu@$AWS_SERVER_NAM}
~/current/bin/jboss-cli.sh --connect
deploy --force books.war
