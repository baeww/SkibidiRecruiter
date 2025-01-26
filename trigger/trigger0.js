exports = async function (changeEvent) {
  // A Database Trigger will always call a function with a changeEvent.
  // Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/

  // This sample function will listen for events and replicate them to a collection in a different Database

  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  // Note: In Atlas Triggers, the service name is defaulted to the cluster name.
  const serviceName = "mongodb-atlas";
  const database = "agents";
  const collection = context.services
    .get(serviceName)
    .db(database)
    .collection(changeEvent.ns.coll);

  // Get the "FullDocument" present in the Insert/Replace/Update ChangeEvents
  try {
    var data = {
      from: "MongoDB <me@samples.mailgun.org>",
      to: "shahsatya25@gmail.com",
      subject: "Temp",
      text: changeEvent,
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    console.log("Success: ");
  } catch (err) {
    console.log("error performing mongodb write: ", err.message);
  }
};
