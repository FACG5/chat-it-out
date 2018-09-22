BEGIN ; 
DROP TABLE  IF EXISTS archivetitles CASCADE;

CREATE TABLE archivetitles(
  id IN NOT NULL,
  sender varchar(30) NOT NULL,
  receiver varchar(30) NOT NULL,
  message varchar(300) NOT NULL
);

INSERT INTO archivetitles (id, sender, receiver, message) SELECT * FROM chats WHERE id IN (SELECT MAX(id) FROM chats GROUP BY sender, receiver) And sender IN(SELECT sender FROM chats GROUP BY sender, receiver) And receiver IN(SELECT receiver FROM chats GROUP BY sender, receiver);

select * from archivetitles where sender=$1 or receiver=$1 order by id;

END ; 