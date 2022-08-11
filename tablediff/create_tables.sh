#Environment dependencies 
#PROJECT=
#DATASET=
#SCHEMA_PATH=???/dist/dereferenced/events/

for EVENT_VERSION in `cat events.list`
do
  echo Starting $schema
  cp $SCHEMA_PATH/$EVENT_VERSION/schema.json ../src
  bin/jsbq -p $PROJECT -d $DATASET -j schema.json
done

echo Finished
