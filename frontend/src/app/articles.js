import React from 'react';

function Articles(props) {

  let allArticles = props.articles;


    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Upvotes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                  allArticles.map(x => {
                    return <tr data-testid="article" key={x.date}>
                            <td data-testid="article-title">{x.title}</td>
                            <td data-testid="article-upvotes">{x.upvotes}</td>
                            <td data-testid="article-date">{x.date}</td>
                          </tr>
                  })
                }
                </tbody>
            </table>
        </div>
    );

}

export default Articles;
