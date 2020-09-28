
## IPTIQ Project

For the given appliccation I have made few assumptions: 

1) Initially I thought of using Redux as a data store, but it made no sense because json file was given and I stored it locally.
2) It would increase the redundancy if I created a redux store and mapped through that store the same json data.
3) I used material-ui as a design library.
4) I used hooks instead of classes because react is moving towards hooks. 

## Deployment Ideas

I feel instead of github pages one can use aws services such as AWS Amplify or beanstalk to deploy the application. 
I am using aws because it takes care of rest of the things when we are scaling. Furthermore, we can also create a docker image which will help running the entire full stack application on various systems.


## Github Pages

I have just created a branch for github pages. Usuallly for deployment I follow certain architecture, but as we are not deploying, I have added everything under master branch.
