# SLL单向链表

``` c++
#include<stdio.h>
#include<stdlib.h>
typedef struct Node
{
    int data;
    struct Node* next;
}Node;
void insertAtBeginning(Node** head,int value)
{
    Node* newnode=(Node*)malloc(sizeof(Node));
    newnode->data=value;
    newnode->next=*head;
    *head=newnode;
}
void insertAtEnd(Node** head,int value)
{
    Node* newnode=(Node*)malloc(sizeof(Node));
    newnode->data=value;
    newnode->next=NULL;
    if(*head==NULL)
    {
        *head=newnode;
        return ;
    }
    Node* temp=*head;
    while(temp->next!=NULL)
    {
        temp=temp->next;
    }
    temp->next=newnode;
}
void insertAtPosition(Node** head,int value,int position)
{
    if(position==1)
    {
        insertAtBeginning(head,value);
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
    temp->next=newnode;
}
void deleteAtBeginning(Node** head)
{
    if(*head==NULL) return ;
    Node* temp=*head;
    *head=temp->next;
    free(temp);
    return ;
}
void deleteAtEnd(Node** head)
{
    if(*head==NULL) return ;
    Node* temp=*head;
    if(temp->next==NULL)
    {
        *head=NULL;
        free(temp);
        return ;
    }
    Node* prev=NULL;
    while(temp->next!=NULL)
    {
        prev=temp;
        temp=temp->next;
    }
    prev->next=NULL;
    free(temp);
}
void deleteAtPosition(Node** head,int position)
{
    if(*head==NULL) return ;
    Node* temp=*head;
    if(position==1)
    {
        deleteAtBeginning(head);
        return ;
    }
    Node* prev=NULL;
    for(int i=1;i<position&&temp!=NULL;i++)
    {
        prev=temp;
        temp=temp->next;
    }
    if(temp==NULL)
    {
        printf("Position out of range\n");
        return ;
    }
    prev->next=temp->next;
    free(temp);
}
void printList(Node* head)
{
    if(head==NULL)
    {
        printf("The list is empty!\n");
        return ;
    }
    Node* temp=head;
    printf("\nThe linked list: \n");
    while(temp!=NULL)
    {
        printf("%d -> ",temp->data);
        temp=temp->next;
    }
    printf("NULL\n");
}
int search(Node* head,int value)
{
    Node* temp=head;
    int position=1;
    while(temp!=NULL)
    {
        if(temp->data==value) return position;
        temp=temp->next;
        position++;
    }
    return -1;
}
int main()
{
    Node* head=NULL;
    insertAtBeginning(&head,10);
    insertAtBeginning(&head,5);
    insertAtEnd(&head,20);
    insertAtEnd(&head,30);
    insertAtPosition(&head,25,4);
    printList(head);
    printf("\nPosition of 25: %d\n",search(head, 25));
    deleteAtBeginning(&head);
    printf("\nAfter deleting beginning: ");
    printList(head);
    deleteAtEnd(&head);
    printf("\nAfter deleting end: ");
    printList(head);
    deleteAtPosition(&head,2);
    printf("\nAfter deleting position 2: ");
    printList(head);
    return 0;
}
```