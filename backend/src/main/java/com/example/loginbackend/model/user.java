package com.example.loginbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class user {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

    private String email;

    private String password;



    // Required by JPA/Hibernate
    public user(){

    }



    // Constructor for login existing usage
    public user(String email, String password){

        this.email = email;
        this.password = password;

    }



    // Constructor for registration
    public user(String name, String email, String password){

        this.name = name;
        this.email = email;
        this.password = password;

    }



    public Long getId(){

        return id;

    }


    public String getName(){

        return name;

    }


    public String getEmail(){

        return email;

    }


    public String getPassword(){

        return password;

    }



    public void setName(String name){

        this.name = name;

    }


    public void setEmail(String email){

        this.email = email;

    }


    public void setPassword(String password){

        this.password = password;

    }

}