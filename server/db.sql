

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

-- sorry for new line, it's my auto formatter

create table ticket_types
(
    type varchar(200) default 'Normal' unique
);

create table ticket_details
(
    type varchar(200) default 'NormalTicket' unique
);

create table tickets
(
    id uuid primary key default uuid_generate_v4() unique,
    extra_chats integer default 0,
    number_of_viewers integer default 0,
    extra_info boolean default false,
    detailed_ticket VARCHAR(200) DEFAULT 'Normal',
    constraint ticket_type_fk FOREIGN key (detailed_ticket) REFERENCES ticket_details(type)
);

create table users
(
    id uuid primary key unique default uuid_generate_v4(),
    email varchar(200),
    name varchar(200),
    ticket_id uuid not null,
    display_name varchar(200),
    chattable boolean default true,
    constraint ticket_id_user FOREIGN KEY (ticket_id) references tickets(id)
);

create table user_scopes
(
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    scope varchar not null,
    constraint usuid FOREIGN key (user_id) references users(id),
    constraint ustid FOREIGN key (scope) REFERENCES ticket_types(type)

);



create table logintokens
(
    ticket_id uuid not null,
    token varchar(2000) unique,
    user_id uuid not null,
    used boolean default false,
    constraint user_id_fk foreign key (user_id) REFERENCES users(id),
    constraint ticket_id_fk foreign key (ticket_id) references tickets(id)
);

create table chat_message
(
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null,
    message varchar(2000) not null,
    sent_time timestamp default now(),
    visible boolean default true,
    constraint user_id_chat FOREIGN KEY (user_id) REFERENCES users(id)
);

--- default values

insert into ticket_types
default values;

insert into ticket_types
    (type)
values
    ('Chat'),
    ('moderator'),
    ( 'admin');

insert into ticket_details
default values;

insert into tickets
    (detailed_ticket)
values
    (
        (select type
        from ticket_details)
);

insert into users
    (email, name, display_name, ticket_id)
values
    ('jakob@jakoblj.com', 'jakob', 'jake', (select id
        from tickets limit
1));


insert into logintokens
    (token, user_id, ticket_id)
values
    ('jake', (select id
        from users), (select id
        from tickets));

insert into logintokens
    (token, user_id, ticket_id)
values
    ('jake2', (select id
        from users), (select id
        from tickets));

insert into chat_message
    (user_id, message)
values
    ((
        select id
        from users 
        limit
1), 'This was the first message');

insert into user_scopes
    (user_id, scope)
values
    ((select id
        from users), (select type
        from ticket_types));