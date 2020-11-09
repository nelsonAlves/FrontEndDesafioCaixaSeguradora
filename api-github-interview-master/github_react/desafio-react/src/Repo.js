import React from "react";

const Repo = ({ repo }) => (

    <div className="card card-body mb-2">
            <div className="row">
                <div className="col-md-6"><a href={repo.html_url}>
                ${repo.name}
                </a>
                </div>
                    <div className="col-md-6">
                        <span className="badge badge-primary">Strars:{repo.stargazes_count}</span>

                        <span className="badge badge-success">Watch:{repo.watchers_count}</span>
                        
                        <span className="badge badge-warning">Forks:{repo.forks_count}</span>
                    </div>
         </div>
        
    </div>
);

export default Repo;