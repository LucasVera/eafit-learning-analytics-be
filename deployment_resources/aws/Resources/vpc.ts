const stage = process.env.STAGE || '${env:STAGE}'
const learningAnalyticsName = `learning-analytics-${stage}`

export default {
  VPC: {
    Type: "AWS::EC2::VPC",
    Properties: {
      CidrBlock: "10.0.0.0/16",
      EnableDnsSupport: true,
      EnableDnsHostnames: true,
      Tags: [
        {
          Key: "Name",
          Value: `${learningAnalyticsName} rds vpc`
        }
      ]
    }
  },
  PublicSubnet1: {
    Type: "AWS::EC2::Subnet",
    Properties: {
      VpcId: {
        Ref: "VPC"
      },
      CidrBlock: "10.0.1.0/24",
      AvailabilityZone: {
        "Fn::Select": [
          0,
          {
            "Fn::GetAZs": ""
          }
        ]
      },
      Tags: [
        {
          Key: "Name",
          Value: `${learningAnalyticsName} rds public subnet 1`
        }
      ]
    }
  },
  PublicSubnet2: {
    Type: "AWS::EC2::Subnet",
    Properties: {
      VpcId: {
        Ref: "VPC"
      },
      CidrBlock: "10.0.2.0/24",
      AvailabilityZone: {
        "Fn::Select": [
          1,
          {
            "Fn::GetAZs": ""
          }
        ]
      },
      Tags: [
        {
          Key: "Name",
          Value: `${learningAnalyticsName} rds public subnet 2`
        }
      ]
    }
  },
  SecurityGroup: {
    Type: "AWS::EC2::SecurityGroup",
    Properties: {
      GroupDescription: "Security group for RDS instance",
      VpcId: {
        Ref: "VPC"
      },
      SecurityGroupIngress: [
        {
          IpProtocol: "tcp",
          FromPort: 5432,
          ToPort: 5432,
          CidrIp: "0.0.0.0/0"
        }
      ]
    }
  },
  InternetGateway: {
    Type: "AWS::EC2::InternetGateway",
    Properties: {
      Tags: [
        {
          Key: "Name",
          Value: `Internet gateway for ${learningAnalyticsName} rds vpc`
        }
      ]
    }
  },
  VPCGatewayAttachment: {
    Type: "AWS::EC2::VPCGatewayAttachment",
    Properties: {
      VpcId: {
        Ref: "VPC"
      },
      InternetGatewayId: {
        Ref: "InternetGateway"
      }
    }
  },
  PublicRouteTable: {
    Type: "AWS::EC2::RouteTable",
    Properties: {
      VpcId: {
        Ref: "VPC"
      },
      Tags: [
        {
          Key: "Name",
          Value: `${learningAnalyticsName} rds public route table`
        }
      ]
    }
  },
  PublicRoute: {
    Type: "AWS::EC2::Route",
    // DependsOn: "VPCGatewayAttachment",
    Properties: {
      RouteTableId: {
        Ref: "PublicRouteTable"
      },
      DestinationCidrBlock: "0.0.0.0/0",
      GatewayId: {
        Ref: "InternetGateway"
      }
    }
  },
  Subnet1RouteTableAssociation: {
    Type: "AWS::EC2::SubnetRouteTableAssociation",
    Properties: {
      SubnetId: {
        Ref: "PublicSubnet1"
      },
      RouteTableId: {
        Ref: "PublicRouteTable"
      }
    }
  },
  Subnet2RouteTableAssociation: {
    Type: "AWS::EC2::SubnetRouteTableAssociation",
    Properties: {
      SubnetId: {
        Ref: "PublicSubnet2"
      },
      RouteTableId: {
        Ref: "PublicRouteTable"
      }
    }
  }
}
