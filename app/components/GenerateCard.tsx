import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function GenerateCard(title: string, text_content: string, image_url: string | null, created_by: string, url: string) {
  // Make more scalable later
  if (image_url != null) {
    return (
      <>
      <Card>
        <Card.Img variant="top" src={image_url} />
        <Card.Body>
          <Card.Title><a href={url} target="_blank">{title}</a></Card.Title>
          <Card.Text>{text_content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Created by @{created_by}</small>
        </Card.Footer>
      </Card>
      </>
    );  
  } else {
    return (
      <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text_content}</Card.Text>
          <Card.Text>
            <small className="text-muted">Created by @{created_by}</small>
          </Card.Text>
        </Card.Body>
      </Card>
      </>
    )
  }
}