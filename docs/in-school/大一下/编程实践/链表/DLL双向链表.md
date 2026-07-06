# DLL双向链表

``` c++
#include<stdio.h>
#include<stdlib.h>
typedef struct Node
{
    int data;
    struct Node* prev;
    struct Node* next;
}Node;
void displayForward(Node* head)
{
    Node* temp=head;
    while(temp!=NULL)
    {
        printf("%d",temp->data);
        if(temp->next!=NULL) printf(" <-> ");
        temp=temp->next;
    }
    printf(" -> NULL\n");
}
void displayBackward(Node* tail)
{
    Node* temp=tail;
    while(temp!=NULL)
    {
        printf("%d",temp->data);
        if(temp->prev!=NULL) printf(" <-> ");
        temp=temp->prev;
    }
    printf(" -> NULL\n");
}
void insertAtBeginning(Node** head,Node** tail,int value)
{
    Node* newnode=(Node*)malloc(sizeof(Node));
    newnode->data=value;
    newnode->prev=NULL;
    newnode->next=*head;
    if(*head==NULL)
    {
        *head=*tail=newnode;
    }
    else
    {
        (*head)->prev=newnode;
        *head=newnode;
    }
}
void insertAtEnd(Node** head,Node** tail,int value)
{
    Node* newnode=(Node*)malloc(sizeof(Node));
    newnode->data=value;
    newnode->next=NULL;
    newnode->prev=*tail;
    if(*tail==NULL)
    {
        *head=*tail=newnode;
    }
    else
    {
        (*tail)->next=newnode;
        *tail=newnode;
    }
}
void insertAtPosition(Node** head,Node** tail,int value,int position)
{
    if(position==1)
    {
        insertAtBeginning(head,tail,value);
        return ;
    }
    Node* newnode=(Node*)malloc(sizeof(Node));
    newnode->data=value;
    Node* temp=*head;
    for(int i=1;i<position-1&&temp!=NULL;i++)
    {
        temp=temp->next;
    }
    if(temp==NULL)
    {
        printf("Position out of range\n");
        free(newnode);
        return ;
    }
    newnode->next=temp->next;
    newnode->prev=temp;
    if(temp->next!=NULL)
    {
        temp->next->prev=newnode;
    }
    else *tail=newnode;
    temp->next=newnode;
}
void deleteAtBeginning(Node** head,Node** tail)
{
    if(*head==NULL) return ;
    Node* temp=*head;
    *head=temp->next;
    if(*head!=NULL)
    {
        (*head)->prev=NULL;
    }
    else *tail=NULL;
    free(temp);
}
void deleteAtEnd(Node** head,Node** tail)
{
    if(*head==NULL) return ;
    Node* temp=*tail;
    *tail=temp->prev;
    if(*tail!=NULL)
    {
        (*tail)->next=NULL;
    }
    else *head=NULL;
    free(temp);
}
void deleteAtPosition(Node** head,Node** tail,int position)
{
    if(*head==NULL||position<1) return ;
    Node* temp=*head;
    int index=1;
    while(temp!=NULL&&index<position)
    {
        temp=temp->next;
        index++;
    }
    if(temp==NULL)
    {
        printf("Position out of range\n");
        return ;
    }
    if(temp->prev!=NULL)
    {
        temp->prev->next=temp->next;
    }
    else *head=temp->next;
    if(temp->next!=NULL)
    {
        temp->next->prev=temp->prev;
    }
    else *tail=temp->prev;
    free(temp);
}
int main()
{
    Node* head=NULL;
    Node* tail=NULL;
    insertAtBeginning(&head,&tail,70);
    insertAtBeginning(&head,&tail,80);
    insertAtBeginning(&head,&tail,90);
    printf("Initial list (forward) : ");
    displayForward(head);
    printf("Initial list (backward) : ");
    displayBackward(tail);
    insertAtBeginning(&head,&tail,100);
    printf("\nAfter inserting 100 at front: ");
    displayForward(head);
    insertAtEnd(&head,&tail,200);
    printf("After inserting 200 at at end: ");
    displayForward(head);
    printf("\nAfter inserting 555 at position 4: ");
    insertAtPosition(&head,&tail,555,4);
    displayForward(head);
    deleteAtBeginning(&head,&tail);
    printf("After deleting front: ");
    displayForward(head);
    deleteAtEnd(&head,&tail);
    printf("After deleting end: ");
    displayForward(head);
    deleteAtPosition(&head,&tail,3);
    printf("After deleting position 3: ");
    displayForward(head);
    return 0;
}
```