
var db = 
  ([
    {
      "id": "5b729d70ea7c3833cc0af45f",
      "content": "Sit quis commodo et duis fugiat duis. Esse mollit consequat aliqua est velit ullamco quis do laborum ad occaecat mollit Lorem ipsum. Aute labore reprehenderit id magna ullamco. Ut est in aliquip ex minim ipsum sit excepteur adipisicing sunt eiusmod occaecat.\r\n",
      "title": "tempor irure magna sint proident",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d709ad0ca24ec1de754",
      "content": "Elit ipsum proident occaecat pariatur tempor id anim ex. Labore do culpa velit veniam do esse laboris pariatur cupidatat est magna sunt reprehenderit dolor. Officia elit elit culpa est eiusmod laborum ea. Irure fugiat minim irure dolore fugiat ad id culpa sint cillum. Enim ut Lorem ea occaecat excepteur officia magna duis.\r\n",
      "title": "voluptate Lorem minim enim magna",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d70d7ff95226023ec76",
      "content": "Adipisicing Lorem enim officia excepteur do et sint sunt officia minim aliqua dolor mollit ea. Elit quis et amet id sit do in dolor eiusmod sint proident velit nostrud cupidatat. Laboris incididunt est consequat laborum mollit sunt cillum proident aliquip nostrud amet. Enim nisi labore exercitation nisi eu ipsum. Mollit et esse qui incididunt labore labore laboris duis culpa excepteur eu.\r\n",
      "title": "occaecat elit elit ipsum Lorem",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d70979fe1b163d4ff48",
      "content": "Irure sint nisi aliquip esse deserunt id. Quis et deserunt reprehenderit consectetur. Anim ad minim officia voluptate minim aute est do occaecat. Dolor magna veniam dolore do do qui velit nostrud labore id. Reprehenderit magna sint eiusmod consequat sint deserunt qui amet adipisicing laboris et. Aliquip laboris Lorem reprehenderit consectetur. Amet id cupidatat deserunt laboris in anim.\r\n",
      "title": "voluptate adipisicing nisi sit ex",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d709b2ffcd643c98b49",
      "content": "Elit reprehenderit adipisicing anim ad occaecat. Sit ut nostrud duis aute officia. Mollit voluptate anim nostrud dolor laborum consequat esse laboris cillum.\r\n",
      "title": "culpa occaecat ad aliquip nisi",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d70de65b1f48611ca7a",
      "content": "Sint esse do irure incididunt pariatur. Enim ut esse non ipsum et officia ipsum cillum ad. Id nulla qui deserunt reprehenderit voluptate labore nulla adipisicing.\r\n",
      "title": "proident dolor excepteur nostrud eiusmod",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    },
    {
      "id": "5b729d708e0dfbc31dc052fa",
      "content": "Do cillum enim magna magna magna sint anim. Sint exercitation qui mollit ullamco tempor nulla nisi Lorem ipsum. Et voluptate qui sit labore consectetur reprehenderit laboris. Mollit quis ut mollit irure irure culpa labore. Sit anim nisi duis dolor. Labore eiusmod laboris aliqua cupidatat proident dolor ipsum.\r\n",
      "title": "cupidatat ex adipisicing dolore occaecat",
      "likes": 2,
      "dislikes": 3,
      "hardCount": 4,
      "easyCount": 5,
      "minTime": 4,
      "maxTime": 6
    }
  ]);

let searchInDB;
searchInDB = (place,time,numOfPeople,more) => {
  return db;
}

let addIdeaToDB;
addIdeaToDB = (title, content, place,time,minNumOfPeople,maxNumOfPeople) => {
  var dbEntry ={
    "id": Math.round(Math.random()*10000),
      "content": content,
      "title": title,
      "likes": 0,
      "dislikes": 0,
      "hardCount": 0,
      "easyCount": 0,
      "minTime": time,
      "maxTime": time,
      "minNumOfPeople": minNumOfPeople,
      "maxNumOfPeople": maxNumOfPeople
  }
  db.push(dbEntry);
}

export {searchInDB,addIdeaToDB};