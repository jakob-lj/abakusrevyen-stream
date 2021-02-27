

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

-- sorry for new line, it's my auto formatter

create table ticket_types
(
    type varchar(200) default 'Normal' unique
);



create table users
(
    email varchar(200),
    name varchar(200),
    display_name varchar(200),
    id uuid primary key unique default uuid_generate_v4(),
    constraint ticket_type_fk FOREIGN key (ticket_type) REFERENCES ticket_types(type)
);

create table user_scopes
(
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    scope varchar not null,
    constraint usuid FOREIGN key (user_id) REFERENCES users(id),
    constraint ustid FOREIGN key (scope) REFERENCES ticket_types(type)

);

create table tickets
(
    id uuid primary key default uuid_generate_v4() unique,
    user_id uuid not null,
    extra_chats integer default 0,
    number_of_viewers integer default 0,
    extra_info boolean default false,
    constraint user_id_ticket_fk FOREIGN key (user_id) references users(id)
);

create table logintokens
(
    ticket_id uuid not null,
    token varchar(2000) unique,
    user_id uuid unique,
    used boolean default false,
    constraint user_id_fk foreign key (user_id) REFERENCES users(id),
    constraint ticket_id_fk foreign key (ticket_id) references tickets(id)
);

create table chat_message
(
    user_id uuid not null,
    message varchar(2000) not null,
    sent_time timestamp default now(),
    constraint user_id_chat FOREIGN KEY (user_id) REFERENCES users(id)
);

--- default values

insert into ticket_types
default values;

insert into users
    (email, name, display_name, ticket_type)
values
    ('jakob@jakoblj.com', 'jakob', 'jake', (select type
        from ticket_types));

insert into tickets
    (user_id)
values
    ((select id
        from users));

insert into logintokens
    (token, user_id, ticket_id)
values
    ('jake', (select id
        from users), (select id
        from tickets));


insert into chat_message
    (user_id, message)
values
    ((select id
        from users), 'This was the first message');

insert into user_scopes
    (user_id, scope)
values
    ((select id
        from users), (select type
        from ticket_types));