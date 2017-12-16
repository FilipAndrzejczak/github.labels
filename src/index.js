const _ = require('lodash');
const axios = require('axios');
const dLabels = require('./labels');

const apiUrl = "https://api.github.com";

const userName = "";
const userToken = "";
const userOrg = "";

const getRepos = () => {
    axios.get(apiUrl + "/orgs/" + userOrg + "/repos?page=1", {
        auth: {
            username: userName,
            password: userToken
        }
    }).then((res) => {
        res.data.forEach((repo) => {
            console.log(repo.url);
            getLabels(repo);
        });
    });
}

const getLabels = (repo) => {
    axios.get(repo.url + "/labels", {
        auth: {
            username: userName,
            password: userToken
        }
    }).then((res) => {
        dLabels.forEach((dLabel) => {
            if (!_.some(res.data, {name: dLabel.name})) {
                addLabel(repo,dLabel);
            }
        });
    });
}

const addLabel = (repo,dLabel) => {
    axios.post(repo.url + '/labels', dLabel ,{
        auth: {
            username: userName,
            password: userToken
        }
    });
}

getRepos();
