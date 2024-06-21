## Entity

    - belongs_to User
    - belongs_to Company
    - id:string
    - username:string
    - hashed_password:string
    - created_at:time

## User

    - entity:Entity
    - profile:json
    - cv:CV
    - metadata:json

## Company

    - entity:Entity
    - profile:json
    - metadata:json

## CV

    - belongs_to User
    - id:string
    - job_position:string
    - metadata:json
