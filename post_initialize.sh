#! /bin/bash

cd `dirname $0`
proto=`realpath proto/`

set -ex

echo '''
contest {
  registration_open_at {
    seconds: 1601701678
  }
  contest_starts_at {
    seconds: 1601701688
  }
  contest_freezes_at {
    seconds: 1601701728
  }
  contest_ends_at {
    seconds: 1601701738
  }
}
''' | protoc --proto_path $proto --encode=xsuportal.proto.services.admin.InitializeRequest xsuportal/services/admin/initialize.proto  | curl -k -X POST -H "content-type: application/vnd.google.protobuf" https://localhost:4433/initialize --data-binary @-
