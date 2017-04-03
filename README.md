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
  - Global-vars: Redux
  - Sort events by time #done
  - Offline mode
  - Check offline, splash reload,wait
  - UX: When clicked interested event --> change background color icon and accept click again to 
    declined
## Redux

###NOTE: If some events havent has cover or a little information, never show or put it in the end.


###Note: Drop fetchData in a file and send param prop rowData to render Function name Events

### ISSUES
```
  - Error1: If location not fully filled... Need check before clicking.
  - Error2: Don't have some status button for change rsvp_status
  - Error3: Share btn inside 
  - Error4: Load 100 items, and lazy load.
  - Error5: Filter by near time, how many attendants or categories.
```
