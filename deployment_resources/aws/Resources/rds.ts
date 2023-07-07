const MasterUsername = process.env.DB_USERNAME || '${env:DB_USERNAME}'
const MasterUserPassword = process.env.DB_PASSWORD || '${env:DB_PASSWORD}'
const DbBaseName = process.env.DB_BASE_NAME || '${env:DB_BASE_NAME}'
const stage = process.env.STAGE || '${env:STAGE}'

export default {
  // Cloudformation resources for an rds instance with postgresql engine. it must be public accessible, have a default database and a user with a password. instance should be a free-tier instance.
  RDSInstance: {
    Type: "AWS::RDS::DBInstance",
    Properties: {
      Engine: "postgres",
      DBInstanceIdentifier: `learninganalytics${stage}`,
      DBName: `${DbBaseName}${stage}`,
      MasterUsername,
      MasterUserPassword,
      AllocatedStorage: 20, // free tier
      DBInstanceClass: "db.t4g.micro", // free tier
      VPCSecurityGroups: [
        {
          Ref: "SecurityGroup"
        }
      ],
      DBSubnetGroupName: {
        Ref: "DBSubnetGroup"
      },
      PubliclyAccessible: true
    }
  },
  DBSubnetGroup: {
    Type: "AWS::RDS::DBSubnetGroup",
    Properties: {
      DBSubnetGroupDescription: `Subnet group for learning analytics rds instance in ${stage}`,
      SubnetIds: [
        {
          Ref: "PublicSubnet1"
        },
        {
          Ref: "PublicSubnet2"
        }
      ]
    }
  }
}

