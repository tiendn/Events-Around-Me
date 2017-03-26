## BE:
  ```
  - Get data about event myself    #Done
    + Options past and future, order by neartime
    + Cancel attending another events in the future: attending, unsure, cancel
  - Get data event near : #Done
    + Location: Latitude and Longtitude
    + 
  - Get data by key search or topics
    + Key search : Easy
    +  *Topics -> Get all topic, choose one and search with this topic ??? --> Need to dig more*
  ```
## UI/UX
Build a slide-menu-views
  - Home
  - Tabs:
    + My events
    + Recommend : DeckSwiper(Native-base)
    + Events near me
    + Popular
    + Search: Options
      + me
      + location
        + some words
        + specify topic
      + google search
    + Notification
      + Alarm
      + Share status
    + Settings : Sort by time / number_attending / (Category) ??
    
## Action:
  - Search
    + events of me
    + events about my location:
      + type some words, default location
      + events about my location with a specify topic
    + events like google search
  - attending
  - cancelled
  - Global-vars
  - Sort events by time #done
  - Offline mode
  - Check offline, splash reload,wait
## Redux

###NOTE: If some events havent has cover or a little information, never show or put it in the end.


###Note: Drop fetchData in a file and send param prop rowData to render Function name Events

