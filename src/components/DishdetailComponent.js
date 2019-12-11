import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle,} from 'reactstrap';
import Moment from 'moment';
Moment.locale('en'); 
class DishDetail extends Component{
    renderDish(dish){
        return( 
                <Card>
                    <CardImg lwidth="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                    
                </Card>
        );
    }
    renderComments(comments){
        const commentsList = comments.map((comment)=>{
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {Moment(comment.date).format('d MMM YYYY')}</p> 
                </li>
            )
        }); 
        if(comments!= null){
            return(<div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled"> 
                        {commentsList}
                    </ul>
                    </div>); 
        }else{
            return(<div></div>); }
    }
    render(){
        if (this.props.dish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)} 
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}
export default DishDetail; 


