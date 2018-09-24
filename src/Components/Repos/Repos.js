import React from 'react';
import Repo from './Repo/Repo';

const Repos = (props) => 
    props.repos.map((repo,index) =>{
        return <Repo
         click = {(event) =>props.removed(event,repo.id)}
         full_name={repo.full_name}
         language = {repo.language}
         tag_name = {repo.tag_name}
         favourite = {repo.favourite}
         changed = {(event) => props.changed(event,repo.id)}
         
        />
      });
    

export default Repos;