"use strict";

import React from 'react';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Author: "No Author",
        Title: "No Title",
        DatePublished: "No Date",
        paragraphs: [],
        comments: [["test","5/4/2017", ""],["comment two", "5/3/2017", ""]]
      };
    };

    componentDidMount() {
      this.listenForItems();
    };

    listenForItems() {

        let articleRef = this.props.firebase.firebase.database().ref().child("Article").child("0");
      
        let blogRef = articleRef;
        blogRef.ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childKey + " : " + childData);
            });
        });

        let titleRef = articleRef.child("title");
        titleRef.on('value', (snap) => {
          this.setState( {
            Title: snap.val()
          } );
        });

        let paragraphsRef = articleRef.child("paragraphs");
        paragraphsRef.on('value', (snap) => {
          this.setState( {
            paragraphs: snap.val()
          } );
        });

        let dateRef = articleRef.child("date");
        dateRef.on('value', (snap) => {
          this.setState( {
            DatePublished: snap.val()
          } );
        });

        let authorRef = articleRef.child("author");
        authorRef.on('value', (snap) => {
          this.setState( {
            Author: snap.val()
          } );
        });

        let commentsRefs = articleRef.child("comments");
        commentsRefs.on('value', (snap) => {
          this.setState( {
            comments: snap.val()
          } );
        });
      
    };
  
    printComments(start = 0, end = this.state.comments.length) {
      if(end > this.state.comments.length) {
        end = this.state.comments.length;
      }
      let body = [];
      for(var i = start; i < end;++i)
      {
        body.push(
          <div className="comment-div"key={i}>
            <p className="comment-username">{this.state.comments[i].username}<span className="comment-date">{this.state.comments[i].date}</span></p>
            
            <p className="comment">{this.state.comments[i].comment}</p>
          </div>
        );
      }
      return body;
      
    };
  
    printParagraphs(start = 0, end = this.state.paragraphs.length) {
      
      let body = [];
      for(var i = start; i < end;++i)
      {
        body.push(<p className="blog-paragraph" key={i}>{this.state.paragraphs[i]}</p>);
      }
      return body;
      
    };

    submitTextArea() {
        let articleRef = this.props.firebase.firebase.database().ref().child("Article").child("0").child("comments");
        let test = document.getElementsByTagName('textArea')[0];
        let length = this.state.comments.length;
        let date = new Date();
        articleRef.child(length).child('comment').set(document.getElementsByTagName('textArea')[0].value);
        articleRef.child(length).child('date').set(date.getFullYear());
        articleRef.child(length).child('username').set("Anon");
        articleRef.child("length").set(length + 1);
    };

    render() {
    return (
      <div className="text-center"> 
        <div className="blog" >
          <h1>{this.state.Title}</h1>
          <h3>{this.state.Author}, {this.state.DatePublished}</h3>

          <div className="line-seperator-v"/>

          {this.printParagraphs(0,2)}
          <img src="http://scontent.cdninstagram.com/t51.2885-15/e35/17437930_274066426376353_4942329368425791488_n.jpg" />
          {this.printParagraphs(2)}

          <div className="comment-section">
            <h3>Comments {this.state.comments.length}</h3>
            <div > 
              <h3>Anon</h3>
              <textarea className="comment-textarea" name="comments" placeholder="I'd love to hear anyhting you have to say..."/>
            </div>
            <div className="comment-buttons"> 
              <button type="button" className="btn" onClick={()=> document.getElementsByTagName('textArea')[0].value = ""}>cancel</button>
              <button type="button" className="btn btn-primary" onClick={()=> this.submitTextArea()}>comment</button>
            </div> 
            <div className="line-seperator-v-thin"/>
            {this.printComments(0, 10)}
          </div>

        </div>
      </div>
    );
  }
}

export default Home;