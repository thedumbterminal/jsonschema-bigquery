PROJECT=hx-trial
DATASET=michael__smith__user2
SCHEMA_PATH=~/tmp/data-platform-message-schemas/dist/dereferenced/events/

for EVENT_VERSION in `cat events.list`
do
echo Starting $schema
cp $SCHEMA_PATH/$EVENT_VERSION/schema.json ../src
node ../src/jsbq.js -p $PROJECT -d $DATASET -j schema.json
done

echo Finished
