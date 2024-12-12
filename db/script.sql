CREATE TABLE users(
    email character varying(255) not null,
    id BIGINT not null primary key,
    username character varying(255) not null,
    fullname CHARACTER varying(70),
    password character varying(255),
    balance bigint default 0,
    avatar_url text
);